import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export class NotifyLoadingMixin extends Vue {
	protected isLoading: boolean = false;

	public notifyLoading(): void {
		this.isLoading = true;
	}

	public notifyNotLoading(): void {
		this.isLoading = false;
	}
}
