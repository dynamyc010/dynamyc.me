// Tabs
function tabHandler(e, tabButtons) {
    e.preventDefault();
    const tabContainer = e.target.parentElement.parentElement;
    const targetId = e.target.getAttribute("aria-controls");
    tabButtons.forEach((_tabButton) =>
        _tabButton.setAttribute("aria-selected", false)
    );
    e.target.setAttribute("aria-selected", true);
    e.target.focus();
    tabContainer
        .querySelectorAll("[role=tabpanel]")
        .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
    tabContainer
        .querySelector(`[role=tabpanel]#${targetId}`)
        .removeAttribute("hidden");
}
  
// Content Tabs
const tabList = document.querySelector("[aria-label='Content Tabs']");
const tabButtons = tabList.querySelectorAll("[role=tab]");
tabButtons.forEach((tabButton) =>
tabButton.addEventListener("mousedown", (evt) => {
    tabHandler(evt, tabButtons)
}));
tabButtons.forEach((tabButton) =>
tabButton.addEventListener("focus", (evt) => {
    tabHandler(evt, tabButtons)
}));