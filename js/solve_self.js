function deleteCheck() {
  if (confirm("삭제하시겠습니까?") == true) {
    document.reportfrm.submit();
  } else {
    return false;
  }
}
