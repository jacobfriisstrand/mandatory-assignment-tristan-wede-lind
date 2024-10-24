fetch("assets/data.json")
  .then((response) => response.json())
  .then((data) => {
    const bioElement = document.getElementById("bio-content");
    const bioBookContent = document.getElementById("bio-book-content");

    data.bio.forEach((item) => {
      const p = document.createElement("p");
      p.innerHTML = item.paragraph;
      bioElement.appendChild(p);
    });

    const quoteElement = document.createElement("blockquote");
    quoteElement.id = "bio-quote";
    quoteElement.textContent = data.bioQuote.text;

    const sourceElement = document.createElement("cite");
    sourceElement.textContent = data.bioQuote.source;
    quoteElement.appendChild(sourceElement);

    bioElement.insertBefore(quoteElement, bioElement.children[3]);

    [data.books[0], data.books[1], data.books[2], data.books[3]].forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.className = "bio-book-item";
      bookElement.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3><span>${book.title}</span><span>${book.subtitle}</span><span class="year">(${book.year})</span></h3>
      `;
      bioBookContent.appendChild(bookElement);
    });

    const tourList = document.getElementById("tour-dates");
    data.tour.forEach((event) => {
      const li = document.createElement("li");
      li.className = "tour-item";
      li.innerHTML = `
                <div class="tour-date">
                  <img src="/assets/img/microphone.png" alt="microphone">
                  <p class="tour-date">${event.date}</p>
                </div>
                <div>
                  <h3 class="tour-title">${event.event}</h3>
                  ${event.role ? `<p class="tour-role">${event.role}</p>` : ""}
                </div>
                <address class="tour-location">${event.location} (${event.venue})</address>
            `;
      tourList.appendChild(li);
    });

    const bookList = document.getElementById("book-list");
    data.books.forEach((book) => {
      const li = document.createElement("li");
      li.className = "book-item";
      li.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                  <h3><span>${book.title}</span><span><span>${book.subtitle}</span><span class="year">(${book.year})</span></span></h3>
                <p>${book.description}</p>
            `;
      bookList.appendChild(li);
    });

    const contactInfo = document.getElementById("contact-info");
    contactInfo.innerHTML = `
            <div class="contact-item">
              <img src="${data.contact.publishing.image}" alt="${data.contact.publishing.name}">
              <div>
                <h3>Publishing</h3>
                <address>
                  <div class="name-role">
                    <p>${data.contact.publishing.name}</p>
                    <p>(${data.contact.publishing.role})</p>
                  </div>
                  <a href="mailto:${data.contact.publishing.email}">${data.contact.publishing.email}</a>
                  <p>Phone: <a href="tel:${data.contact.publishing.phone}">${data.contact.publishing.phone}</a></p>
                </address>
              </div>
            </div>
            
            <div class="contact-item">
              <img src="${data.contact.agent.image}" alt="${data.contact.agent.name}">
              <div>
                <h3>Agent</h3>
                <address>
                  <p>${data.contact.agent.name}</p>
                  <p>${data.contact.agent.role}</p>
                  <a href="mailto:${data.contact.agent.email}">${data.contact.agent.email}</a>
                  <p>Phone: <a href="tel:${data.contact.agent.phone}">${data.contact.agent.phone}</a></p>
                </address>
              </div>
            </div>
        `;

    const creditsList = document.getElementById("credits-list");
    data.credits.forEach((credit) => {
      const li = document.createElement("li");
      li.innerHTML = `${credit.description} by <a href="${credit.url}" target="_blank" rel="noopener noreferrer">${credit.author}</a>`;
      creditsList.appendChild(li);
    });
  })
  .catch((error) => console.error("Error loading data:", error));
