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
    provider: "thecatapi.com",
    func(): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        fetch("https://api.thecatapi.com/v1/images/search?limit=1")
          .then((resp) => resp.json())
          .then((data) => {
            return resolve(data[0].url);
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
