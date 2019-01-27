import Vue, { CreateElement, VNode } from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';
import { ClassName, Theme, ThemeComponent } from 'void-ui';

/**
 * Component: Example
 */
@Component
export class CExample extends Vue implements ThemeComponent {
  @Prop(String)
  public readonly theme?: Theme;
  public get themeValue(): Theme {
    return this.theme || this.$vd_theme.theme || 'lite';
  }
  public get classes(): ClassName {
    return [`cp-theme_${this.themeValue}`];
  }

  private render(h: CreateElement): VNode {
    return <div staticClass="c-example">{this.$slots.default}</div>;
  }
}
