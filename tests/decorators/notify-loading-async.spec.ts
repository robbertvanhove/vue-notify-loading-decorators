import { NotifyLoadingAsync } from '../../src/decorators';
import { Component, Mixins } from 'vue-property-decorator';
import { NotifyLoadingMixin } from '../../src/mixins';
import 'jest-extended';

@Component
class TestComponent extends Mixins(NotifyLoadingMixin) {
	private dummyData: any[] = [];

	@NotifyLoadingAsync
	public async loadDataAsync(): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.dummyData = ['a', 'b'];
				resolve();
			}, 1000);
		});
	}

	@NotifyLoadingAsync
	public getDataAsync(dataSource: { data: any[] }): Promise<any[]> {
		return new Promise<any[]>((resolve, reject) => {
			resolve(dataSource.data);
		});
	}

	@NotifyLoadingAsync
	public async errorFunctionAsync(): Promise<void> {
		throw 'error';
	}
}

describe(NotifyLoadingAsync, () => {
	describe('decorates a succeeding async method', () => {
		it('should call the notifyLoading method once on the component', async function() {
			// ARRANGE
			const component = new TestComponent({});
			const spyNotifyLoading = jest.spyOn(component, 'notifyLoading');

			// Act
			await component.loadDataAsync();

			// ASSERT
			expect(spyNotifyLoading).toBeCalledTimes(1);
		});
		it('should call the notifyNotLoading method once on the component', async function() {
			// ARRANGE
			const component = new TestComponent({});
			const spyNotifyNotLoading = jest.spyOn(component, 'notifyNotLoading');

			// Act
			await component.loadDataAsync();

			// ASSERT
			expect(spyNotifyNotLoading).toBeCalledTimes(1);
		});

		it('should call the notifyLoading before the notifyNotLoading method on the component', async function() {
			// ARRANGE
			const component = new TestComponent({});
			const spyNotifyNotLoading = jest.fn(component.notifyNotLoading);
			const spyNotifyLoading = jest.fn(component.notifyLoading);

			// Act
			await component.loadDataAsync();

			// ASSERT
			expect(spyNotifyNotLoading).toHaveBeenCalledAfter(spyNotifyLoading);
		});

		it('should not alter the behaviour of a stateless method', async function() {
			// ARRANGE
			const component = new TestComponent({});
			const dataSource = { data: ['1', 'a'] };
			// ACT
			const result = await component.getDataAsync(dataSource);

			// ASSERT
			expect(result).toEqual(dataSource.data);
		});

		it('should not alter the behaviour of the component itself', async function() {
			// ARRANGE
			const component = new TestComponent({});

			// ACT
			await component.loadDataAsync();
			const { dummyData } = component.$data;

			// ASSERT
			expect(dummyData).toEqual(['a', 'b']);
		});
	});

	describe('decorates a method that throws an error', () => {
		it('should throw the exact same error', function() {
			// ARRANGE
			const component = new TestComponent({});

			// ACT
			const promise = component.errorFunctionAsync();

			expect(promise).toReject().catch(error => {
				expect(error).toEqual('error');
			});
		});
	});
});
