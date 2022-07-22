import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import subCategory from './subCategory';

const information = {
  categories: [
    'bags',
    'shoes',
    'clothing',
    'accessories',
  ],
  colors: [
    'Black',
    'Blue',
    'Brown',
    'Gold',
    'Green',
    'Gray',
    'Metallic',
    'Orange',
    'Pink',
    'Purple',
    'Red',
    'Silver',
    'Tan',
    'White',
    'Yellow',
    'Print',
    'Multi',
    'Animal',
  ],
  sizes: [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '0',
    '2',
    '4',
    '6',
    '8',
    '10',
    '12',
    '14',
    '16',
  ],
  shoeSizes: [
    '4',
    '4.5',
    '5',
    '5.5',
    '6',
    '6.5',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
  ],
  featuredList: [
    'New Arrivals',
    'Popular',
    'Rare Finds',
    'Editor Pick 1',
    'Editor Pick 2',
    'Editor Pick 3',
    'Editor Pick 4',
  ],
};

// eslint-disable-next-line import/no-mutable-exports
let EditProductForm = (props) => {
  const {
    handleSubmit, pristine, submitting, deleteProduct, categoryValue, product,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-2">
        <div className="col-10" />
        <button className="btn btn-danger float-right" type="button" onClick={deleteProduct} >Delete</button>
      </div>
      <div className="row">
        <div className="col-8 col-8 no-padding">
          <div className="row">
            <div className="form-group col px-0">
              <label>Title</label>
              <div>
                <Field name="title" component="input" type="text" placeholder="" style={{ width: '100%' }} />
              </div>
            </div>

          </div>
          <div className="form-group">
            <label>Url</label>
            <div>
              <Field className="col" name="url" component="input" type="text" placeholder="url" />
            </div>
          </div>
        </div>
        <div className="col-4">
          {isEmpty(product.img) ? (
            <img
              src="http://via.placeholder.com/300x400"
              style={{ height: '150px', width: '150px', objectFit: 'cover' }}
              alt="product"
            />
          ) : (
            <img
              src={product.img}
              style={{ height: '150px', width: '150px', objectFit: 'cover' }}
              alt="product"
            />

          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label>Brand</label>
          <div>
            <Field name="brand" component="input" type="text" style={{ width: '90%' }} />
          </div>
        </div>

        <div className="form-group">
          <label>Price</label>
          <div>
            <Field
              name="price"
              component="input"
              type="number"
              parse={value => Number(value)}
              style={{ width: '90%' }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Retail Price</label>
          <div>
            <Field
              name="retail_price"
              component="input"
              type="number"
              parse={value => Number(value)}
              style={{ width: '90%' }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-group col px-0">
          <label>Category</label>
          <div>
            <Field name="category" component="select" style={{ width: '90%' }}>
              {information.categories.map(category =>
                <option value={category} key={category}>{category}</option>)}
            </Field>
          </div>
        </div>
        <div className="form-group col px-0">
          <label>Featured</label>
          <div>
            <Field name="featured" component="select" style={{ width: '90%' }}>
              <option value="" />
              {information.featuredList.map(featured =>
                <option value={featured} key={featured}>{featured}</option>)}
            </Field>
          </div>
        </div>
        <div className="form-group col px-0">
          <label className="mt-1">Approved Status</label>
          <label className="mt-1">
            <Field
              name="approved"
              id="employed"
              component="input"
              type="checkbox"
            />
            <span className="ml-2">Approved</span>
          </label>
        </div>
      </div>
      <div className="row mb-3">
        {{
          accessories: (
            <div className="form-group col-4 px-0">
              <label>Sub Category</label>
              <div>
                <Field name="sub_category" component="select" style={{ width: '90%' }}>
                  <option value="">Select sub category...</option>
                  {subCategory.accessories.map(subCat =>
                    <option value={subCat} key={subCat}>{subCat}</option>)}
                </Field>
              </div>
            </div>
          ),
          clothing: (
            <div className="form-group col px-0">
              <label>Sub Category</label>
              <div>
                <Field name="sub_category" component="select" style={{ width: '90%' }}>
                  <option value="">Select sub category...</option>
                  {subCategory.clothing.map(subCat =>
                    <option value={subCat} key={subCat}>{subCat}</option>)}
                </Field>
              </div>
            </div>
          ),
          shoes: (
            <div className="form-group col px-0">
              <label>Sub Category</label>
              <div>
                <Field name="sub_category" component="select" style={{ width: '90%' }}>
                  <option value="">Select sub category...</option>
                  {subCategory.shoes.map(subCat =>
                    <option value={subCat} key={subCat}>{subCat}</option>)}
                </Field>
              </div>
            </div>
          ),
          bags: (
            <div className="form-group col px-0">
              <label>Sub Category</label>
              <div>
                <Field name="sub_category" component="select" style={{ width: '90%' }}>
                  <option value="">Select sub category...</option>
                  {subCategory.bags.map(subCat =>
                    <option value={subCat} key={subCat}>{subCat}</option>)}
                </Field>
              </div>
            </div>
          ),
        }[categoryValue]}
        <div className="form-group col px-0">
          <label>Color</label>
          <div>
            <Field name="color" component="select" style={{ width: '90%' }}>
              <option value="">Select color...</option>
              {information.colors.map(colorOption =>
                <option value={colorOption} key={colorOption}>{colorOption}</option>)}
            </Field>
          </div>
        </div>
        {{
          accessories: (
            <div className="row col-5 px-0">
              <div className="col form-group px-0">
                <label>Size</label>
                <div>
                  <Field name="size" component="select" style={{ width: '95%' }}>
                    <option value="">Select size...</option>
                    {information.sizes.map(size =>
                      <option value={size} key={size}>{size}</option>)}
                  </Field>
                </div>
              </div>
              <div className="col px-0 form-group">
                <label>Shoe Size</label>
                <div>
                  <Field name="shoe_size" component="select" style={{ width: '95%' }}>
                    <option value="">Select size...</option>
                    {information.shoeSizes.map(size =>
                      <option value={size} key={size}>{size}</option>)}
                  </Field>
                </div>
              </div>
            </div>
            ),
            clothing: (
              <div className="form-group col px-0">
                <label>Size</label>
                <div>
                  <Field name="size" component="select" style={{ width: '100%' }}>
                    <option value="">Select size...</option>
                    {information.sizes.map(size =>
                      <option value={size} key={size}>{size}</option>)}
                  </Field>
                </div>
              </div>
            ),
            shoes: (
              <div className="col px-0 form-group">
                <label>Shoe Size</label>
                <div>
                  <Field name="shoe_size" component="select" style={{ width: '95%' }}>
                    <option value="">Select size...</option>
                    {information.shoeSizes.map(size =>
                      <option value={size} key={size}>{size}</option>)}
                  </Field>
                </div>
              </div>
            ),
      }[categoryValue]}
      </div>
      <div className="">
        <Link className="" to="/admin/allproducts" >
          <button className="btn btn-danger" type="button" >
              Cancel
          </button>
        </Link>
        <button className="btn btn-primary float-right" type="submit" disabled={pristine || submitting}>Save & Close</button>
      </div>
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditProductForm = reduxForm({
  form: 'editProductForm', // a unique identifier for this form
})(EditProductForm);
const selector = formValueSelector('editProductForm'); // <-- same as form name
EditProductForm = connect(state => ({
  categoryValue: selector(state, 'category'),
  admin: state.admin,
  product: state.admin.product,
  initialValues: state.admin.product,
  // pull initial values from account reducer
}))(EditProductForm);

export default EditProductForm;
