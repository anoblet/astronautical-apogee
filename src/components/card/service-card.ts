import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";
import { CardComponent } from "./card";

@customElement("service-card")
export class ServiceCard extends CardComponent {
  static styles = [...super.styles, css``];
}
