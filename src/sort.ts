import { removeListFromDom, htmlElementList, paintListInDom } from "./state";

const sortForm = document.querySelector(".sort-form") as HTMLFormElement;
const sortInput = document.querySelector(".sort-input") as HTMLSelectElement;

type SortType = "sort by title" | "sort by finished";

const getLabelElement = function (listItem: HTMLElement) {
  const childrenArray = Object.values(listItem.children);
  const [labelElement] = childrenArray.filter(
    (child) => child.tagName === "LABEL"
  );
  return labelElement;
};

const getCheckboxElement = function (listItem: HTMLElement): HTMLInputElement {
  const childrenArray = Object.values(listItem.children);
  const [checkboxElement] = childrenArray.filter((child) =>
    child.className.includes("check-box")
  );
  return checkboxElement as HTMLInputElement;
};

const sortByTitle = function () {
  if (htmlElementList.length < 2) {
    return [];
  }
  const sortedList = htmlElementList.sort((secondElement, firstElement) => {
    const secondLabel = getLabelElement(secondElement);
    const firstLabel = getLabelElement(firstElement);
    const secondLabelText = secondLabel.textContent!;
    const firstLabelText = firstLabel.textContent!;

    if (secondLabelText > firstLabelText) return 1;
    else return -1;
  });
  return sortedList;
};

const sortByFinished = function () {
  if (htmlElementList.length < 2) return [];

  const sortedList = htmlElementList.sort((secondElement, firstElement) => {
    const secondCheckbox = getCheckboxElement(secondElement);
    const firstCheckbox = getCheckboxElement(firstElement);
    const isSecondCheckboxChecked = secondCheckbox.checked;
    const isFirstCheckboxChecked = firstCheckbox.checked;

    if (!isSecondCheckboxChecked && isFirstCheckboxChecked) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedList;
};

const handleSort = function (event: Event) {
  event.preventDefault();
  const sortType: SortType = sortInput.value as SortType;

  switch (sortType) {
    case "sort by title":
      const sortedItems = sortByTitle();
      if (!sortedItems.length) return;
      removeListFromDom();
      paintListInDom(sortedItems);
      break;
    case "sort by finished":
      const sortedItems2 = sortByFinished();
      if (!sortedItems2.length) return;
      removeListFromDom();
      paintListInDom(sortedItems2);
      break;
    default:
      const _exhaustiveCheck: never = sortType;
      console.log(_exhaustiveCheck);
  }
};
sortForm.addEventListener("submit", handleSort);
