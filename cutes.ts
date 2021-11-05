export function findCuteCat(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fetch("https://aws.random.cat/meow")
      .then((resp) => resp.json())
      .then((data) => {
        return resolve(data.file);
      }).catch((err) => {
        return reject(err);
      });
  });
}

export function findCuteDog(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((resp) => resp.json())
      .then((data) => {
        return resolve(data.message);
      }).catch((err) => {
        return reject(err);
      });
  });
}

export function findCuteFox(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fetch("https://randomfox.ca/floof/")
      .then((resp) => resp.json())
      .then((data) => {
        return resolve(data.image);
      }).catch((err) => {
        return reject(err);
      });
  });
}
