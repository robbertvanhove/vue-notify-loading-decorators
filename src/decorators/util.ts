export const replacePropertyDescriptorValue =
		<T>(propertyDescriptor: TypedPropertyDescriptor<T>,
		    newValueInitializer: (originalValue: T) => T) => {

			const originalValue = propertyDescriptor.value;
			propertyDescriptor.value = newValueInitializer(originalValue);
		};
