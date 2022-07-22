/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import labelsList from '../../components/Refinement/labels';

// Utils
import { removeEmptyProperty } from '../../../../utils';
import labelsUtil from '../../utils/LabelsUtil';

// Actions
import { queryProducts, setFilters } from '../../../../services/product/actions';

const Category = (props) => {
    const [selected, setSelected] = React.useState({});
    let labels = [];
    labels = labelsUtil(props, labelsList);

    const handleChange = event => {
        setSelected({
            ...selected,
            [event.target.name]: event.target.checked
        });
        searchFromFilters({
            ...selected,
            [event.target.name]: event.target.checked
        });
    };

    const searchFromFilters = (data) => {
        const { match, colors, pricemin, pricemax, designers, size } = props;
        const { category, brand } = match.params;
        const params = [];
        const brandParams = [];

        Object.keys(data).forEach((key) => {
            if(data[key] === true) {
            const searchLabels = labels.find(label => label.value[0] === key);
            if (props.attribute === 'brand') {
                brandParams.push(searchLabels.label.toLowerCase());
            } else {
                params.push(searchLabels.label.toLowerCase());
            }
            }
        });
        
        if (props.attribute === 'brand') {
            props.setFilters('brand', brandParams);
        } 
        
        if (props.attribute === 'subcategory' || props.attribute === 'sub_category') {
            props.setFilters('subcategory', params);
        }

        const reqParams = {
            query: match.params.query,
            category,
            brand: [...brandParams, ...designers, brand].join(','),
            sub_category: params.join(','),
            color: colors.join(','),
            size: size.join(','),
            pricemin,
            pricemax,

            count: 10,
            page: 1,
        }

        props.queryProducts(removeEmptyProperty(reqParams));
    }

    return (
        <div className="retroced-flex-box">
            {labels.map((item, index) => {
                return (
                    <div className="formrow" key={index}>
                        <input
                            className="custom-checkbox"
                            id={`custom-checkbox${index}`}
                            type="checkbox"
                            name={item.value}
                            checked={selected[item.value]}
                            onChange={handleChange}
                        />
                        <label className="checklabel" htmlFor={`custom-checkbox${index}`}>
                            {item.label}
                        </label>
                    </div>
                );
            })}
            <style jsx>
                {`
                    .retroced-flex-box{
                    display: flex;
                    flex-flow: row wrap;
                    }

                    .formrow {
                    flex: 1 auto;
                    overflow:hidden;
                    position:relative;
                    max-width:300px;
                    margin:auto;
                    
                    }
                    .checklabel {
                    border:2px solid #253259;
                    background: transparent;
                    border-radius:2px;
                    text-align: center;
                    padding:10px 10px;
                    font-size: 1rem;
                    }
                    .checklabel:hover {
                    background:#ddd;
                    }
                    .custom-checkbox {
                    position:absolute;
                    right:10px;
                    top:15px;
                    width: 2.2em;
                    height: 2.2em;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    -ms-appearance: none;
                    appearance: none;
                    border:none;
                    padding:0;
                    border-radius:0;
                    vertical-align: middle;
                    background-color:transparent;
                    transition:.3s ease;
                    outline:0;
                    }
                    
                    .custom-checkbox:focus + label{
                    border-color:#253259;
                    } 

                    .custom-checkbox:active + label {
                    background-color: transparent;
                    }

                    .custom-checkbox:checked + label{
                    background-color: #253259;
                    color: #ffffff;
                    }
                `}
            </style>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.Product.isLoading,
        colors: state.Product.colors,
        designers: state.Product.brand,
        subcategory: state.Product.subcategory,
        size: state.Product.size,
        pricemin: state.Product.pricemin,
        pricemax: state.Product.pricemax,
    };
}

const mapDispatchToProps = {
    queryProducts,
    setFilters,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
