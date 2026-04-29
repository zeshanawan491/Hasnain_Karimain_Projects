let team = JSON.parse(localStorage.getItem("team")) || [];

const container = document.getElementById("team");

// Load from JSON if empty
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    if (team.length === 0) {
      team = data;
      save();
    } else {
      render();
    }
  });

function render(data = team) {
  container.innerHTML = "";
  data.forEach((m, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${m.image}" width="80">
        <h3>${m.name}</h3>
        <p>${m.role}</p>
        <button onclick="del(${i})">Delete</button>
      </div>
    `;
  });
}

function add() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const img = document.getElementById("img").value;

  if (!name || !role) return;

  team.push({ name, role, image: img });
  save();
}

function del(i) {
  team.splice(i, 1);
  save();
}

function save() {
  localStorage.setItem("team", JSON.stringify(team));
  render();
}

// Search
document.getElementById("search").addEventListener("input", e => {
  let val = e.target.value.toLowerCase();
  let filtered = team.filter(t =>
    t.name.toLowerCase().includes(val)
  );
  render(filtered);
});

// Dark mode
document.getElementById("dark").onclick = () => {
  document.body.classList.toggle("dark");
};