/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

themeStoreKeySuffix = 'admintheme';
var getAdminPreferenceKey = function getAdminPreferenceKey() {
  return getTenantName() + '-adminPreferences';
};
var getAdminPreferences = function getAdminPreferences() {
  return JSON.parse(localStorage.getItem(getAdminPreferenceKey()));
};
var setAdminPreferences = function setAdminPreferences(adminPreferences) {
  var key = getAdminPreferenceKey();
  localStorage.setItem(key, JSON.stringify(adminPreferences));
  Cookies.set(key, JSON.stringify(adminPreferences), {
    expires: 360
  });
};
// We add some classes to the body tag to restore the sidebar to the state is was before reload.
// That state was saved to localstorage by userPreferencesPersistor.js
// We need to apply the classes BEFORE the page is rendered.
// That is why we use a MutationObserver instead of document.Ready().
var isCompactExplicit = false;
var observer = new MutationObserver(function (mutations) {
  for (var i = 0; i < mutations.length; i++) {
    for (var j = 0; j < mutations[i].addedNodes.length; j++) {
      if (mutations[i].addedNodes[j].tagName == 'BODY') {
        var body = mutations[i].addedNodes[j];
        var adminPreferences = getAdminPreferences();
        if (adminPreferences) {
          isCompactExplicit = adminPreferences.isCompactExplicit;
          if (adminPreferences != null && adminPreferences.leftSidebarCompact == true) {
            body.classList.add('left-sidebar-compact');
          }
        }
        observer.disconnect();
      }
      ;
    }
  }
});
observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});