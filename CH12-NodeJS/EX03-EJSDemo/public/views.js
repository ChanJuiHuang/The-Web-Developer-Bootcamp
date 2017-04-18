const app = new Vue({
  el: '#app',
  data: {
    newPerson: {
      name: '',
      phone: '',
      answer: '',
      language: '',
    },
    searchKey:'',
    people: [{
      name: 'Ray',
      phone: '0910123456',
      answer: true,
      language: 'Chinese',
    }]
  },
  computed: {
    displayedPeople(){
      const _people = this.people;
      if (this.searchKey === '') return _people;
      const searchedPeople = [];
      for (let i = 0; i < _people.length; i++){
        const person = _people[i];
        const personValue = Object.values(person);
        const pattern = new RegExp(this.searchKey, 'i');

        for (let value of personValue){
          if (value.search(pattern) !== -1){
            searchedPeople.push(person);
            break;
          }
        }
      }
      return searchedPeople;
    }
  },
  methods: {
    add(){
      this.newPerson.answer = (this.newPerson.answer === 'true')? true : false;
      this.people.push(this.newPerson);
      this.cancel();
    },
    remove(name){
      const index = this.people.findIndex(item => item.name === name);
      this.people.splice(index, 1);
    },
    cancel(){
      this.newPerson = {
        name: '',
        phone: '',
        answer: '',
        language: '',
      };
    },
    sort(propt){
      this.displayedPeople = this.people.sort(
        (person1, person2) => person1[propt] > person2[propt]
      );
    }
  }
});
