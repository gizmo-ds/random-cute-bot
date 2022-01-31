interface Cute {
  name: string;
  command: string;
  provider: string;
  func: () => Promise<string>;
}

export const cutes: Cute[] = [
  {
    name: "Cat",
    command: "cat",
    provider: "random.cat",
    func(): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        fetch("https://aws.random.cat/meow")
          .then((resp) => resp.json())
          .then((data) => {
            return resolve(data.file);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
  },
  {
    name: "Dog",
    command: "dog",
    provider: "dog.ceo",
    func(): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        fetch("https://dog.ceo/api/breeds/image/random")
          .then((resp) => resp.json())
          .then((data) => {
            return resolve(data.message);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
  },
  {
    name: "Fox",
    command: "fox",
    provider: "randomfox.ca",
    func(): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        fetch("https://randomfox.ca/floof/")
          .then((resp) => resp.json())
          .then((data) => {
            return resolve(data.image);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
  },
];
