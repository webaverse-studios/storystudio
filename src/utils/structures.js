export class SceneObject {
  content = "";

  constructor(content = "") {
    this.content = content;
  }

  parse() {
    return this.content;
  }
}

export class PartyObject {
  name = "";
  character = "";
  bio = "";
  intentory = "";

  constructor(name = "", character = "", bio = "", intentory = "") {
    this.name = name;
    this.character = character;
    this.bio = bio;
    this.intentory = intentory;
  }

  parse() {
    return {
      name: this.name,
      character: this.character,
      bio: this.bio,
      intentory: this.intentory,
    };
  }
}

export class ObjectObject {
  name = "";
  description = "";

  constructor(name = "", description = "") {
    this.name = name;
    this.description = description;
  }

  parse() {
    return {
      name: this.name,
      description: this.description,
    };
  }
}

export class NPCObject {
  name = "";
  description = "";

  constructor(name = "", description = "") {
    this.name = name;
    this.description = description;
  }

  parse() {
    return {
      name: this.name,
      description: this.description,
    };
  }
}

export class MobObject {
  name = "";
  description = "";

  constructor(name = "", description = "") {
    this.name = name;
    this.description = description;
  }

  parse() {
    return {
      name: this.name,
      description: this.description,
    };
  }
}
