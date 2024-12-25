import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const fancy = document.querySelectorAll('[data-fancybox]');

if(fancy.length) {
  Fancybox.bind("[data-fancybox]", {});
}
