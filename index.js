// constants
const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api';
const COHORT_CODE = '2507-ftb-et-web-ft';
const RESOURCE = 'events';
const apiUrl = `${BASE_URL}/${COHORT_CODE}/${RESOURCE}`;

// state
let parties = [];
let selectedParty;

const fetchParties = async () => {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    parties = data.data;

    console.log(parties);
  } catch (err) {
    console.error(err);
  } finally {
    render();
  }
};

const fetchParty = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/${id}`);
    const data = await res.json();

    selectedParty = data.data;

    console.log(selectedParty);
  } catch (err) {
    console.error(err);
  } finally {
    render();
  }
};

const PartyCard = (key, party) => {
  const partyCardHTML = `
    <li key=${key} class="party-card">
      <a id=${party.id} href="#selected">${party.name}</a>
    </li>
  `;

  return partyCardHTML;
};

const PartyList = () => {
  const partyListHTML = `
    <ul class="upcoming-parties">
      ${parties
        .map((party, partyIndex) => PartyCard(partyIndex, party))
        .join('')}
    </ul>
  `;

  return partyListHTML;
};

const PartyDetails = () => {
  if (!selectedParty) return `<p>Please select a party to learn more.</p>`;

  const partyDetailsHTML = `
    <section class="party">
      <h3>${selectedParty.name} #${selectedParty.id}</h3>
      <div>
        <p><em>${Date(selectedParty.date)}</em></p>
        <p><em>${selectedParty.location}</em></p>
      </div>
      <p>${selectedParty.description}<p>
      <ul></ul>
    </section>
  `;

  return partyDetailsHTML;
};

const render = () => {
  const $app = document.querySelector('#app');

  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <div class="party-list"></div>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <div class="party-details"></div>
      </section>
    </main>
  `;

  document.querySelector('.party-list').innerHTML = PartyList();
  document.querySelector('.party-details').innerHTML = PartyDetails();

  // event listeners
  document
    .querySelectorAll('.party-card')
    .forEach((partyCard) =>
      partyCard.addEventListener('click', (e) => fetchParty(e.target.id))
    );
};

const init = async () => {
  await fetchParties();

  render();
};

init();
