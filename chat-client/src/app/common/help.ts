export const validRangeChat = (lstChat: any[]) => {
  if(lstChat.length > 15){
    lstChat.shift()
  }
  scrollBottom();
  return lstChat;
}


export const scrollBottom = () => {
  setTimeout(() => {
    document.querySelector('.msger-chat').scroll({
      top: 1000,
      left: 0,
      behavior: 'smooth',
    });
  }, 500)

}
