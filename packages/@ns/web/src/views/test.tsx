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
 * Component: Test
 */
@Component
export default class VTest extends Vue implements ThemeComponent {
  @Prop(String)
  public readonly theme?: Theme;

  public get themeValue(): Theme {
    return this.theme || this.$vd_theme.theme || 'lite';
  }

  public get classes(): ClassName {
    return [`vp-theme_${this.themeValue}`];
  }

  private render(h: CreateElement): VNode {
    return (
      <div staticClass="v-test">
        <vd-swimlane>
          <vd-container>
            <vd-flexbox tag="ul" direction="column" align="stretch" gap>
              {Array(1000)
                .fill(0)
                .map((item, index) => (
                  <vd-flexbox tag="li">list item {index}</vd-flexbox>
                ))}
            </vd-flexbox>
          </vd-container>
        </vd-swimlane>
      </div>
    );
  }
}
