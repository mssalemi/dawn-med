class ProductService {
  constructor() {
    this.routes = {
      allProducts: '/products.json',
      productByHandle(handle) {
        return `/products/${handle}.js`;
      },
    };
  }

  getProducts() {
    return fetch(this.routes.allProducts, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => data);
  }
}

function inputStringElem(option) {
  return '<input type="text" name="string" id="string" placeholder="String" />';
}

function loadStringingService() {}

document.addEventListener('DOMContentLoaded', function () {
  console.log('[SS]: DOMContentLoaded');
  const productStringingService = document.getElementById('product-stringing-service');
  const stringServiceEnabledButton = document.getElementById('string-service-enabled');
  const label = document.getElementById('string-service-enabled-label');
  const stringSelected = document.getElementById('string-selected');
  console.log('[SS]: productStringingService', productStringingService);
  productStringingService.innerHTML = '... Stringing Service Loading';

  console.log('[SS]: stringServiceEnabledButton', stringServiceEnabledButton.value);

  stringServiceEnabledButton.addEventListener('change', (event) => {
    console.log('[SS]: onchange', event.target.checked);
    console.log(stringServiceEnabledButton);
    console.log(label.innerHTML);
    if (event.target.checked) {
      label.innerHTML = 'Remove';
      stringService.loadStringService();
    } else {
      label.innerHTML = 'Add Stringing Service';
      stringService.removeStringService();
    }
  });

  const stringService = new StringService(productStringingService);
  stringService.loadStringService();

  //   const productService = new ProductService();

  //   productService.getProducts().then(({ products }) => {
  //     console.log(products);
  //     const strings = products.filter((product) => {
  //       return product.handle.includes('string_service');
  //     });
  //     console.log(strings);
  //     const options = strings.map((string) => {
  //       return string.variants.map((variant) => {
  //         return `<option id="${variant.id}" type="text" value="${variant.title}">${variant.title} - $${variant.price}</option>`;
  //       });
  //     });
  //     console.log(options);
  //     console.log('[SS]: strings', strings);
  //     const select = document.createElement('select');
  //     console.log('[SS]: select', select);
  //     select.innerHTML = options;
  //     console.log('[SS]: select', select);

  //     productStringingService.innerHTML = select.outerHTML;
  //   });
});

class StringService {
  constructor(element) {
    this.productService = new ProductService();
    this.element = element;
  }

  loadStringService() {
    this.productService.getProducts().then(({ products }) => {
      console.log(products);
      const strings = products.filter((product) => {
        return product.handle.includes('string_service');
      });
      const options = strings.map((string) => {
        return string.variants.map((variant) => {
          return `<option id="${variant.id}" type="text" value="${variant.title}">${variant.title} - $${variant.price}</option>`;
        });
      });
      const select = document.createElement('select');
      select.innerHTML = options;
      select.id = 'string-service-select';

      this.element.innerHTML = '';
      this.element.appendChild(select);

      select.addEventListener('change', (event) => {
        console.log('select changed');
        console.log(event.target.value);
      });
    });
  }

  removeStringService() {
    this.element.innerHTML = '';
  }
}
