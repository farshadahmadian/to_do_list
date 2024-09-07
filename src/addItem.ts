import {
  inputState,
  list,
  htmlElementList,
  addInput,
  listContainer,
} from "./state";

const addBtn = document.querySelector(".add-btn")!;

const createElementFromString = function (html: string): HTMLElement {
  const listItem = document.createElement("li");
  listItem.classList.add("to-do-container");
  listItem.setAttribute("data-key", inputState.id);
  listItem.innerHTML = html;
  return listItem;
};

const createHtmlListString = function (): string {
  return `<input
						data-key=${inputState.id}
            id="to-do-${inputState.id}"
            class="check-box"
            type="checkbox"
            name="to-do-${inputState.id}"
          /><label data-key=${inputState.id} for="to-do-${inputState.id}" class="to-do">${inputState.title}</label><button class="btn delete-btn" data-key=${inputState.id}><img data-key=${inputState.id} class="delete-img" src="./assets/delete.png" alt="Delete" /></button>`;
};

const resetInputState = function () {
  inputState.id = "0";
  inputState.title = "";
};

export const handleAddItem = function (event: Event) {
  event.preventDefault();
  if (!inputState.title.trim().length) return;
  inputState.id = Date.now().toString();
  list.push({ ...inputState });
  addInput.value = "";
  const htmlString = createHtmlListString();
  const htmlElement = createElementFromString(htmlString);
  htmlElementList.push(htmlElement);
  listContainer.insertAdjacentElement("beforeend", htmlElement);
  resetInputState();
};

addBtn.addEventListener("click", handleAddItem);
