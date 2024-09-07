export const addInput = document.querySelector(
  ".add-input"
) as HTMLInputElement;

export const listContainer = document.querySelector(".list")!;

export interface Item {
  title: string;
  id: string;
  isCrossed: false;
}

export let inputState: Item = {
  title: "",
  id: "0",
  isCrossed: false,
};

export let list: Item[] = [];
export let htmlElementList: HTMLElement[] = [];

export const removeFromList = function (dataKey: string) {
  list = list.filter((item) => {
    return item.id !== dataKey;
  });
};

export const removeFromHtmlElementList = (dataKey: string): void => {
  htmlElementList = htmlElementList.filter((htmlElement) => {
    return htmlElement.getAttribute("data-key") !== dataKey;
  });
};

export const resetList = function () {
  list = [];
};

export const resetHtmlElementList = function () {
  htmlElementList = [];
};

export const removeListFromDom = function () {
  htmlElementList.forEach((htmlElement) => htmlElement.remove());
  resetHtmlElementList();
  resetList();
};

export const paintListInDom = function (sortedList: HTMLElement[]) {
  htmlElementList = sortedList;
  htmlElementList.forEach((htmlElement) => {
    listContainer.insertAdjacentElement("beforeend", htmlElement);
  });
};

const handleChangeInput = function (event: Event) {
  inputState.title = (event.target as HTMLInputElement).value;
};
addInput.addEventListener("input", handleChangeInput);
