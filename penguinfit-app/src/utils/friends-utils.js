
const deleteProperties = (obj, properties) => {
  for (const property of properties){
    delete obj[property];
  }
};
  
export const getAddFriendsOptions = (requests ,friends, users, username) => {
  // eslint-disable-next-line no-unused-vars
  const { [username]:remove , ...usersCopy } = users;
  deleteProperties(usersCopy, friends.map(el => el.username));
  if(requests){
    deleteProperties(usersCopy, requests.sent.map(el => el.receiver));
    deleteProperties(usersCopy, requests.received.map(el => el.sender));
  };
  return Object.keys(usersCopy);
};
  
export const sortRequests = (requests, username) => {
  if(!requests) return null;
  const requestsArr = Object.values(requests);
  const sent = [];
  const received = [];
  requestsArr.forEach(el => {
    if(el.sender === username) {
      return sent.push(el);
    } 
    return received.push(el);
  });
  return { received , sent };
};
  