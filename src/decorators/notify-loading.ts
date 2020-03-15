import { NotifyLoadingMixin } from '../mixins';
import { Func } from './types';
import { replacePropertyDescriptorValue } from './util';

type NotAPromise = { then?: 'No promise can be passed in this way', catch?: 'dont try' } & Object | void

export function NotifyLoading(
		target: NotifyLoadingMixin,
		propertyKey: string | symbol,
		propertyDescriptor: TypedPropertyDescriptor<Func<NotAPromise>>
) {
	replacePropertyDescriptorValue
	(propertyDescriptor, originalValue =>
			function(...args: any[]) {
				const thisContext = this as NotifyLoadingMixin;
				thisContext.notifyLoading();

				try {
					const result = originalValue.apply(this, args);
					thisContext.notifyNotLoading();
					return result;
				} catch (e) {
					thisContext.notifyNotLoading();
					throw e;
				}
			}
	);
}
