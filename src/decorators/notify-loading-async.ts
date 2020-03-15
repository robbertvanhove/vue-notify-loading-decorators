import { NotifyLoadingMixin } from '../mixins';
import { Func } from './types';
import { replacePropertyDescriptorValue } from './util';

export function NotifyLoadingAsync(
		target: NotifyLoadingMixin,
		propertyKey: string | symbol,
		propertyDescriptor: TypedPropertyDescriptor<Func<Promise<any>>>
) {

	replacePropertyDescriptorValue(propertyDescriptor, originalValue => async function(...args: any[]) {
		const thisContext = this as NotifyLoadingMixin;
		thisContext.notifyLoading();

		try {
			const result = await originalValue.apply(this, args);
			thisContext.notifyNotLoading();
			return result;
		} catch (e) {
			console.log('ERROR', e);
			thisContext.notifyNotLoading();
			throw e;
		}
	});
}
