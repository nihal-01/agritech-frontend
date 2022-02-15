import React, { useEffect, useState } from 'react';
import {
    MdPayment,
    MdShoppingCart,
    MdOutlineExplore,
    MdPerson,
    MdOutlineShoppingBag,
    MdOutlineDeliveryDining,
} from 'react-icons/md';

import './AdminHomePage.scss';
import { BarChart, DoughnutChart } from '../../../components/admin';
import axios from '../../../axios';
import { Loader } from '../../../components/customer';

function AdminHomePage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        oneDayOrder: {},
        oneMonthOrder: {},
        allTimeOrder: {},
        totalOrders: 0,
        totalUsers: 0,
        totalProducts: 0,
        totalDeliveredOreders: 0,
        topSellingProducts: [],
        topSellingCategories: [],
    });

    console.log('admin home');

    const fetchData = async () => {
        try {
            console.log('fetch admin data');
            const response = await axios.get('/admin');
            setData((prev) => {
                return {
                    ...prev,
                    oneDayOrder: response.data.oneDayOrder,
                    oneMonthOrder: response.data.oneMonthOrder,
                    allTimeOrder: response.data.allTimeOrder,
                    totalOrders: response.data.totalOrders,
                    totalUsers: response.data.totalUsers,
                    totalProducts: response.data.totalProducts,
                    totalDeliveredOreders: response.data.totalDeliveredOreders,
                    topSellingProducts: response.data.topSellingProducts,
                    topSellingCategories: response.data.topSellingCategories,
                };
            });
            setLoading(false);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <div className='admin__home'>
            <h1 className='admin__home__title'>Dashboard Overview</h1>
            <div className='admin__home__grid'>
                <div className='admin__home__grid__item'>
                    <div className='admin__home__grid__item__icon'>
                        <MdOutlineExplore />
                    </div>
                    <div className='admin__home__grid__item__text'>
                        <p>Today Order</p>
                        <h4>&#8377; {data.oneDayOrder?.total || 0}</h4>
                    </div>
                </div>
                <div className='admin__home__grid__item'>
                    <div className='admin__home__grid__item__icon'>
                        <MdShoppingCart />
                    </div>
                    <div className='admin__home__grid__item__text'>
                        <p>This Month</p>
                        <h4>&#8377; {data.oneMonthOrder.total}</h4>
                    </div>
                </div>
                <div className='admin__home__grid__item'>
                    <div className='admin__home__grid__item__icon'>
                        <MdPayment />
                    </div>
                    <div className='admin__home__grid__item__text'>
                        <p>Total Order</p>
                        <h4>&#8377; {data.allTimeOrder.total}</h4>
                    </div>
                </div>
            </div>
            <div className='admin__home__tiles'>
                <div className='admin__home__tile'>
                    <div className='admin__home__tile__icon order'>
                        <MdShoppingCart />
                    </div>
                    <div className='admin__home__tile__content'>
                        <p>Total Orders</p>
                        <span>{data.totalOrders}</span>
                    </div>
                </div>
                <div className='admin__home__tile'>
                    <div className='admin__home__tile__icon pending'>
                        <MdPerson />
                    </div>
                    <div className='admin__home__tile__content'>
                        <p>Total Users</p>
                        <span>{data.totalUsers}</span>
                    </div>
                </div>
                <div className='admin__home__tile'>
                    <div className='admin__home__tile__icon processing'>
                        <MdOutlineShoppingBag />
                    </div>
                    <div className='admin__home__tile__content'>
                        <p>Total Products</p>
                        <span>{data.totalProducts}</span>
                    </div>
                </div>
                <div className='admin__home__tile'>
                    <div className='admin__home__tile__icon delivered'>
                        <MdOutlineDeliveryDining />
                    </div>
                    <div className='admin__home__tile__content'>
                        <p>Order Delivered</p>
                        <span>{data.totalDeliveredOreders}</span>
                    </div>
                </div>
            </div>
            <div className='admin__home__charts'>
                <div className='admin__home__charts__item'>
                    <p>Top Revenue Product</p>
                    <div className='admin__home__charts__item__chart'>
                        <BarChart chartData={data.topSellingCategories} />
                    </div>
                </div>
                <div className='admin__home__charts__item'>
                    <p>Top Revenue Product</p>
                    <div className='admin__home__charts__item__chart'>
                        <DoughnutChart chartData={data.topSellingProducts} />
                    </div>
                </div>
            </div>
            {/* <div>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
            </div> */}
        </div>
    );
}

export default AdminHomePage;
