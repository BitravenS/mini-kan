export class col {
  title: string;
  color: string;
  tasks: Array<task>;

  constructor(title: string, color: string, tasks: Array<task>) {
    this.title = title;
    this.color = color;
    this.tasks = tasks;
  }
}

const randomId = (): number => {
  return Math.floor(Math.random() * 1000000);
};

export class task {
  id: number;
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.id = randomId();
    this.name = name;
    this.description = description;
  }
}
