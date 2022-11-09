export class Itchlist {
  public name: string;
  public location: string;
  public description: string;
  public imagePath: string;

  constructor(name: string,
             location: string,
             description: string,
             imagePath: string)
             {
              this.name = name;
              this.location = location;
              this.description = description;
              this.imagePath = imagePath;
  }
}
