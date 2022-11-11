export class Course {
  public name: string;
  public location: string;
  public date: any;
  public par: any;
  public score: any;
  public description: string;
  public imagePath: string;
  public id?: string;
//  I tried giving Course this id property  to fix an error in my app.ts 🤷‍♂️
  constructor(name: string,
              location: string,
              date: any,
              par: any,
              score: any,
              desc: string,
              imagePath: string,
              id?: string)
     {
    this.name = name;
    this.location = location;
    this.date = date;
    this.par = par;
    this.score = score;
    this.description = desc;
    this.imagePath = imagePath;
  }
}
