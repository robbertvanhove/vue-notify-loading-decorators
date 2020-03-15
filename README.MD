# vue-notify-loading-decorators
A library for Vue.js to toggle a loading indicator with decorators on a component. 

(use along with [vue-class-component](https://github.com/vuejs/vue-class-component))

## Installation
```npm install vue-notify-loading-decorators```

or

```yarn add vue-notify-loading-decorators```

## Example
```vue
<template>
  <div>
    <my-loader v-if="isLoading" /> 
    <!--... dynamic data visualisation -->
  </div>
</template>
<script lang="ts">
import {mixins, Component} from 'vue-class-component'; 
import { NotifyLoadingMixin, NotifyLoadingAsync } from 'vue-notify-loading-decorator'; 

@Component
class SomeDynamicComponent extends mixins(NotifyLoadingMixin) {
  
  @NotifyLoadingAsync
  async loadSomething() {
     await service.getAll();
  }
 
  @NotifyLoadingAsync
  async loadSomethingElse() {
    await someAction();
  }  
}
</script>
```


Instead of:
```vue

<template>
  <div>
    <my-loader v-if="isLoading" /> 
    <!--... dynamic data visualisation -->
  </div>
</template>
<script >
import {Component} from 'vue-class-component';
@Component
class SomeDynamicComponent extends Vue {
  loading: boolean = false; 

   async loadSomething() {
    this.loading = true;
    this.products = await service.getAll();
    this.loading = false;  
  }
 
   async loadSomethingElse() {
    this.loading = true;
    await someAction();
    this.loading = false;
  }  
}
</script>

```


