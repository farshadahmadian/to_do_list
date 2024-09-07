import { removeListFromDom } from "./state";

const clearBtn = document.querySelector(".clear-btn") as HTMLElement;

const handleClearList = removeListFromDom;

clearBtn.addEventListener("click", handleClearList);
