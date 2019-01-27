# @ns/common

> 基于 Void-UI 的，用于特定网站的全站通用组件库。

## 使用方式

### 项目中引用

```ts
// main.ts
import Vue from 'vue';
import Common from '@ns/common';
Vue.use(Common, {
  // VoidUI Options
});
```

```tsx
// app.tsx
import Vue, { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

/**
 * Component: App
 */
@Component
export default class VApp extends Vue {
  private render(h: CreateElement): VNode {
    return (
      <div id="app" staticClass="v-app">
        <ns-header />
        <router-view staticClass="v-app_wrapper" />
        <ns-footer />
      </div>
    );
  }
}
```

### 静态页中通过 CDN 引用

```html
<!DOCTYPE html>
<head>
  <script src="/path/to/cdn/ns-common.js"></script>
</head>

<body>
  <!-- 通用头部导航 -->
  <ns-header theme="dark"></ns-header>

  <!-- 页面内容 -->

  <!-- 通用页脚 -->
  <ns-footer theme="dark"></ns-footer>
</body>

</html>

```
