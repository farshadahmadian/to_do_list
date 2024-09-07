import {
  list,
  htmlElementList,
  removeFromHtmlElementList,
  removeFromList,
} from "./state";

const main = document.querySelector(".main")!;

const findImageElementInBtn = function (btn: Element): Element {
  return btn.firstElementChild!;
};

const deleteItem = function (event: Event): void {
  const toDoContainers = document.getElementsByClassName("to-do-container");
  const deleteBtns = document.getElementsByClassName("delete-btn");
  const deleteImgs = document.getElementsByClassName("delete-img");
  if (toDoContainers.length && deleteBtns.length && deleteImgs.length) {
  }
  for (const deleteBtn of Object.values(deleteBtns)) {
    const deleteImg = findImageElementInBtn(deleteBtn);
    if (event.target === deleteBtn || event.target === deleteImg) {
      for (const toDoContainer of Object.values(toDoContainers)) {
        if (
          toDoContainer.getAttribute("data-key") ===
          deleteBtn.getAttribute("data-key")
        ) {
          toDoContainer.remove();
          removeFromList(toDoContainer.getAttribute("data-key")!);
          removeFromHtmlElementList(toDoContainer.getAttribute("data-key")!);
          console.log("list:", list);
          console.log("htmlList: ", htmlElementList);
        }
      }
    }
  }
  return;
};

const switchTextDecoration = function (
  label: HTMLElement,
  checkbox: HTMLInputElement
): void {
  label.style.textDecoration = checkbox.checked ? "line-through" : "none";
};

const getCurrentLabel = function (
  dataKey: string,
  labels: NodeListOf<Element>
) {
  for (const label of Object.values(labels)) {
    if (label.getAttribute("data-key") === dataKey) {
      return label;
    }
  }
};

const crossItem = function (event: Event): void {
  const toDoContainers = document.getElementsByClassName("to-do-container");
  const checkBoxes = document.getElementsByClassName("check-box");
  const labels = document.querySelectorAll(".check-box + label");

  if (toDoContainers.length && checkBoxes.length && labels.length) {
    for (const checkbox of Object.values(checkBoxes)) {
      if (event.target) {
        const label = getCurrentLabel(
          checkbox.getAttribute("data-key")!,
          labels
        );
        switchTextDecoration(
          label as HTMLElement,
          checkbox as HTMLInputElement
        );
      }
    }
  }
  return;
};

const handleDeleteOrCrossItem = function (event: Event): void {
  deleteItem(event);
  crossItem(event);
  return;
};

main.addEventListener("click", handleDeleteOrCrossItem);
