/**
 * skenario test E2E — alur Login
 *
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty (input required)
 *   - should display alert when password is empty (input required)
 *   - should display alert when email and password are wrong
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[id=email]').should('be.visible');
    cy.get('input[id=password]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });

  it('should display alert when email is empty (input required)', () => {
    // klik tombol Masuk tanpa mengisi email
    cy.get('button').contains(/^Masuk$/).click();

    // email termasuk input required sehingga form tidak tersubmit
    cy.get('input[id=email]:invalid').should('exist');
  });

  it('should display alert when password is empty (input required)', () => {
    // mengisi email lalu klik Masuk tanpa password
    cy.get('input[id=email]').type('syamsul@example.com');
    cy.get('button').contains(/^Masuk$/).click();

    // password termasuk input required sehingga form tidak tersubmit
    cy.get('input[id=password]:invalid').should('exist');
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email dan password yang salah
    cy.get('input[id=email]').type('salah@example.com');
    cy.get('input[id=password]').type('kata-sandi-salah');

    // menyiapkan penangkap dialog alert dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });

    // klik tombol Masuk
    cy.get('button').contains(/^Masuk$/).click();
  });
});
