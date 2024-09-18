class LocalStorageService {
  static setTokenDetails(tokenDetail) {
    localStorage.setItem('tokenDetail', JSON.stringify(tokenDetail));
  }
  static getTokenDetails() {
    return JSON.parse(localStorage.getItem('tokenDetail'));
  }

  static clear() {
    localStorage.clear();
  }
}

export default LocalStorageService;
