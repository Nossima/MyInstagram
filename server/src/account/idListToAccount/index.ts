import {
  Account, AccountModel
} from 'account/models';

const idListToAccount = (idList: string[]) => {
  const requests: Account[] = [];
  const forEachPromise = idList.map((friendRequest) =>
    AccountModel.findOne({ _id: friendRequest }).exec()
      .then((request) => {
        requests.push(request);
      })
  );
  return Promise.all(forEachPromise)
    .then(() => requests)
    .catch((e) => {
      console.log(e);
      return [];
    });
};

export default idListToAccount;
