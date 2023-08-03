function reportCheck() {
  if (confirm("신고하시겠습니까?") == true) {
    document.reportfrm.submit();
  } else {
    return false;
  }
}
