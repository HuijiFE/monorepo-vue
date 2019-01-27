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
 * Global header for the whole site.
 */
@Component
export class NsHeader extends Vue implements ThemeComponent {
  @Prop(String)
  public readonly theme?: Theme;
  public get themeValue(): Theme {
    return this.theme || this.$vd_theme.theme || 'lite';
  }

  public get classes(): ClassName {
    return [`nsp-theme_${this.themeValue}`];
  }

  private render(h: CreateElement): VNode {
    return (
      <div staticClass="ns-header" class={this.classes} id="header">
        <vd-container tag="nav" staticClass="ns-header_container">
          <vd-flexbox tag="ul" align="stretch" gap>
            <vd-flexbox tag="li" flex="none" align="stretch">
              <a staticClass="ns-header_item is-brand" href="/">
                Header
              </a>
            </vd-flexbox>

            <vd-flexbox tag="li" flex="none" align="stretch">
              <a staticClass="ns-header_item" href="/item">
                Item
              </a>
            </vd-flexbox>
            <vd-flexbox tag="li" flex="none" align="stretch">
              <a staticClass="ns-header_item" href="/item">
                Item
              </a>
            </vd-flexbox>

            <vd-flexbox tag="li" staticClass="ns-header_separator" />

            <vd-flexbox tag="li" flex="none" align="stretch">
              <a staticClass="ns-header_item" href="/search">
                Search
              </a>
            </vd-flexbox>
            <vd-flexbox tag="li" flex="none" align="stretch">
              <a staticClass="ns-header_item" href="/sign-in">
                Sign In
              </a>
            </vd-flexbox>
          </vd-flexbox>
        </vd-container>
      </div>
    );
  }
}
