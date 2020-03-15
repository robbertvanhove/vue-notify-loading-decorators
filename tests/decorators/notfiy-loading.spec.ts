import { NotifyLoading } from '../../src/decorators';
import { Component, Mixins } from 'vue-property-decorator';
import { NotifyLoadingMixin } from '../../src/mixins';
import 'jest-extended';

@Component
class TestComponent extends Mixins(NotifyLoadingMixin) {
	private dummyData: any[] = [];

	@NotifyLoading
	public loadData(): void {
		this.dummyData = ['a', 'b'];
	}

	@NotifyLoading
	public getDataFrom(dataSource: { data: any[] }): any[] {
		return dataSource.data;
	}

	@NotifyLoading
	public errorFunction(): void {
		throw 'error';
	}
}

describe(NotifyLoading, () => {
	describe('decorates a succeeding method', () => {
		it('should call the notifyLoading method once on the component', function() {
			// ARRANGE
			const component = new TestComponent({});
			const spyNotifyLoading = jest.spyOn(component, 'notifyLoading');

			// Act
			component.loadData();

			// ASSERT
			expect(spyNotifyLoading).toBeCalledTimes(1);
		});
		it('should call the notifyNotLoading method once on the component', function() {
			// ARRANGE
			const component = new TestComponent({});
			const spyNotifyNotLoading = jest.spyOn(component, 'notifyNotLoading');

			// Act
			component.loadData();

			// ASSERT
			expect(spyNotifyNotLoading).toBeCalledTimes(1);
		});

		it('should call the notifyLoading before the notifyNotLoading method on the component', function() {
			// ARRANGE
			const component = new TestComponent({});
			const spyNotifyNotLoading = jest.fn(component.notifyNotLoading);
			const spyNotifyLoading = jest.fn(component.notifyLoading);

			// Act
			component.loadData();

			// ASSERT
			expect(spyNotifyNotLoading).toHaveBeenCalledAfter(spyNotifyLoading);
		});

		it('should not alter the behaviour of a stateless method', function() {
			// ARRANGE
			const component = new TestComponent({});
			const dataSource = { data: ['1', 'a'] };
			// ACT
			const result = component.getDataFrom(dataSource);

			// ASSERT
			expect(result).toEqual(dataSource.data);
		});

		it('should not alter the behaviour of the component itself', function() {
			// ARRANGE
			const component = new TestComponent({});

			// ACT
			component.loadData();
			const { dummyData } = component.$data;

			// ASSERT
			expect(dummyData).toEqual(['a', 'b']);
		});
	});


	describe('decorates a method that throws an error', () => {
		it('should throw the exact same error', function() {
			// ARRANGE
			const component = new TestComponent({});

			// ASSERT
			expect(() => {
				component.errorFunction();
			}).toThrowError('error');
		});
	});
});
