import _ from 'underscore';
import Debug from './debug';
import ActionCenter from './actioncenter';

class Command{
  constructor(name){
    this.name = name;

    this.state = {
      name: this.name,
      required: {},
      optional: {},
      options: {},

      description: undefined,
      docs: undefined,
      example: undefined,

      queue: [],
    };
    
    ActionCenter.merge(this, this.state.queue);

    return this;
  }

  required(name, description){
    if(!_.isString(name)){ 
      Debug.error(`[command.${this.name}.required.${name}] The name must be a string!`)
      return this;
    }
    if(!_.isString(description)){ 
      Debug.error(`[command.${this.name}.required.${name}] The description must be a string!`)
      return this;
    }

    this.state.required[name] = {description};
    return this;
  }

  optional(name, description){
    if(!_.isString(name)){ 
      Debug.error(`[command.${this.name}.optional.${name}] The name must be a string!`)
      return this;
    }
    if(!_.isString(description)){ 
      Debug.error(`[command.${this.name}.optional.${name}] The description must be a string!`)
      return this;
    }

    this.state.optional[name] = {description};
    return this;
  }

  option(name, description){
    if(!_.isString(name)){ 
      Debug.error(`[command.${this.name}.option.${name}] The name must be a string!`)
      return this;
    }
    if(!_.isString(description)){ 
      Debug.error(`[command.${this.name}.option.${name}] The description must be a string!`)
      return this;
    }

    this.state.options[name] = {description}
    return this;
  }

  description(description){
    if(!_.isString(description)){ 
      Debug.error(`[command.${this.name}.description] The description must be a string!`)
      return this;
    }
    this.state.description = description;
    return this;
  }

  docs(docs){
    if(!_.isString(docs)){ 
      Debug.error(`[command.${this.name}.docs] The docs must be a string!`)
      return this;
    }
    this.state.docs = docs;
    return this;
  }

  example(example){
    if(!_.isString(example)){ 
      Debug.error(`[command.${this.name}.example] The example must be a string!`)
      return this;
    }
    this.state.example = example;
    return this;
  }
}

export default Command;