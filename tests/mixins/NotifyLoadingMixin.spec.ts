import { NotifyLoadingMixin } from '../../src/mixins';
import { Component, Mixins } from 'vue-property-decorator';

describe(NotifyLoadingMixin, function() {
	@Component
	class TestComponent extends Mixins(NotifyLoadingMixin) {
	}

	describe('property: isLoading', () => {
		it('should be false by default', function() {
			// ARRANGE
			const component = new TestComponent({});
			const { isLoading } = component.$data;

			// ASSERT
			expect(isLoading).toBe(false);
		});
	});

	describe('calling notifyLoading()', function() {
		it('should set property isLoading to true', function() {
			// ARRANGE
			const component = new TestComponent({});

			// ACT
			component.notifyLoading();

			// ASSERT
			const { isLoading } = component.$data;
			expect(isLoading).toBe(true);
		});
	});

	describe('calling notifyNotLoading', () => {
		it('should set property isLoading to false', function() {
			// ARRANGE
			const component = new TestComponent({});

			// ACT
			component.notifyNotLoading();

			// ASSERT
			const { isLoading } = component.$data;
			expect(isLoading).toBe(false);
		});

		it('should set property isLoading to false after notifyLoading() is called', function() {
			// ARRANGE
			const component = new TestComponent({});

			// ACT
			component.notifyLoading();
			component.notifyNotLoading();

			// ASSERT
			const { isLoading } = component.$data;
			expect(isLoading).toBe(false);
		});
	});
});
