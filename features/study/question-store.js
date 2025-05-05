class QuestionStore {
  set(category, question) {
    this.category = category;
    this.question = question;
  }

  get() {
    return {
      category: this.category,
      question: this.question,
    };
  }
}

const questionStore = new QuestionStore();

module.exports = { questionStore };
