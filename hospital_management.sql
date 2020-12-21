-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2020 at 06:42 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `appoint_list`
--

CREATE TABLE `appoint_list` (
  `appoint_id` int(40) NOT NULL,
  `patient_id` int(40) NOT NULL,
  `a_type` varchar(40) NOT NULL,
  `a_doctorid` int(40) NOT NULL,
  `a_doctorname` varchar(40) NOT NULL,
  `a_date` datetime(4) DEFAULT NULL,
  `a_status` varchar(10) NOT NULL DEFAULT 'True',
  `created_on` datetime(6) NOT NULL,
  `modified_on` datetime(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Appointment Table';

--
-- Dumping data for table `appoint_list`
--

INSERT INTO `appoint_list` (`appoint_id`, `patient_id`, `a_type`, `a_doctorid`, `a_doctorname`, `a_date`, `a_status`, `created_on`, `modified_on`) VALUES
(14, 3, 'addd', 155, 'dsd', '0000-00-00 00:00:00.0000', 'false', '2020-12-20 11:29:01.000000', '2020-12-20 15:40:07.00000');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `f_id` int(40) NOT NULL,
  `username` varchar(40) NOT NULL,
  `comment` varchar(100) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `rating` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `uid` int(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `pwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`uid`, `email`, `pwd`) VALUES
(2, 'raja@gmail.com', 'ad6afa176c03e04f3ccd4a1e2fc3510d'),
(3, 'raja@gmail.com', 'd85a757bbbfbb921342eff0b781b07c0'),
(4, 'raja@gmail.com', '12345'),
(5, 'raja@gmail.com', '7887ed08c9766ace207b0e492b3dbae8');

-- --------------------------------------------------------

--
-- Table structure for table `m_stocks`
--

CREATE TABLE `m_stocks` (
  `med_id` int(20) NOT NULL,
  `med_name` varchar(40) NOT NULL,
  `med_description` varchar(40) NOT NULL,
  `med_quantity` int(40) NOT NULL,
  `category_id` varchar(30) NOT NULL,
  `priceofeach` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Medical Stockes';

--
-- Dumping data for table `m_stocks`
--

INSERT INTO `m_stocks` (`med_id`, `med_name`, `med_description`, `med_quantity`, `category_id`, `priceofeach`) VALUES
(1, 'gag', 'hsh', 1, '2', 23);

-- --------------------------------------------------------

--
-- Table structure for table `patient_list`
--

CREATE TABLE `patient_list` (
  `p_id` int(40) NOT NULL,
  `p_name` varchar(45) NOT NULL,
  `p_age` int(40) DEFAULT NULL,
  `p_height` int(40) NOT NULL,
  `p_weight` int(40) NOT NULL,
  `p_gender` varchar(20) DEFAULT NULL,
  `bloodgroup` varchar(20) NOT NULL,
  `p_address` varchar(45) DEFAULT NULL,
  `p_phone` int(40) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `modified_on` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='List Of Patients';

--
-- Dumping data for table `patient_list`
--

INSERT INTO `patient_list` (`p_id`, `p_name`, `p_age`, `p_height`, `p_weight`, `p_gender`, `bloodgroup`, `p_address`, `p_phone`, `created_on`, `modified_on`) VALUES
(3, 'Test', 20, 155, 60, 'male', 'A+', 'aabd,bbsb,ahs', 2147483647, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(4, 'Test', 20, 155, 60, 'male', 'A+', 'aabd,bbsb,ahs', 2147483647, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(6, 'TestToday', 20, 155, 60, 'male', 'A+', 'aabd,bbsb,ahs', 2147483647, '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `ph_billing`
--

CREATE TABLE `ph_billing` (
  `b_id` int(40) NOT NULL,
  `patient_id` int(40) NOT NULL,
  `invoice_no` varchar(40) NOT NULL,
  `amount` int(40) NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `type` varchar(30) NOT NULL,
  `payment_type` varchar(30) NOT NULL,
  `pay_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Pharmacy Billing';

--
-- Dumping data for table `ph_billing`
--

INSERT INTO `ph_billing` (`b_id`, `patient_id`, `invoice_no`, `amount`, `date`, `type`, `payment_type`, `pay_status`) VALUES
(1, 3, '17717', 110, '2020-12-20 15:23:02.253758', 'medicine', 'Cash', 'True'),
(2, 4, '32344', 110, '2020-12-20 15:23:06.785861', 'medicine', 'Cash', 'True');

-- --------------------------------------------------------

--
-- Table structure for table `register_user`
--

CREATE TABLE `register_user` (
  `p_id` int(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `age` int(40) NOT NULL,
  `gender` varchar(40) NOT NULL,
  `address` varchar(40) NOT NULL,
  `phone` int(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `bloodgroup` varchar(20) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `modified_on` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register_user`
--

INSERT INTO `register_user` (`p_id`, `name`, `age`, `gender`, `address`, `phone`, `email`, `bloodgroup`, `created_on`, `modified_on`) VALUES
(1, 'test', 20, 'female', 'nsnns,sns,sjdnns', 2147483647, 'rr21@gmail.com', 'B+', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(2, 'test', 20, 'male', 'nsnns,sns,sjdnns', 2147483647, 'rr21@gmail.com', 'B+', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE `staffs` (
  `s_id` int(40) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `dob` date NOT NULL,
  `age` int(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` int(40) NOT NULL,
  `w_location` varchar(40) NOT NULL,
  `hire_date` date NOT NULL,
  `staff_type` varchar(20) NOT NULL,
  `s_address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staffs`
--

INSERT INTO `staffs` (`s_id`, `firstname`, `lastname`, `name`, `gender`, `dob`, `age`, `email`, `phone`, `w_location`, `hire_date`, `staff_type`, `s_address`) VALUES
(1, 'Test', 'testt', 'test testt', 'Male', '0000-00-00', 20, 'bwnnd@gma.com', 2147483647, 'chennai', '0000-00-00', 'doctor', 'dsbsjhhhhs');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appoint_list`
--
ALTER TABLE `appoint_list`
  ADD PRIMARY KEY (`appoint_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `m_stocks`
--
ALTER TABLE `m_stocks`
  ADD PRIMARY KEY (`med_id`);

--
-- Indexes for table `patient_list`
--
ALTER TABLE `patient_list`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `ph_billing`
--
ALTER TABLE `ph_billing`
  ADD PRIMARY KEY (`b_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `register_user`
--
ALTER TABLE `register_user`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`s_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appoint_list`
--
ALTER TABLE `appoint_list`
  MODIFY `appoint_id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `uid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `m_stocks`
--
ALTER TABLE `m_stocks`
  MODIFY `med_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `patient_list`
--
ALTER TABLE `patient_list`
  MODIFY `p_id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ph_billing`
--
ALTER TABLE `ph_billing`
  MODIFY `b_id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `register_user`
--
ALTER TABLE `register_user`
  MODIFY `p_id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `s_id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appoint_list`
--
ALTER TABLE `appoint_list`
  ADD CONSTRAINT `appoint_list_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_list` (`p_id`);

--
-- Constraints for table `ph_billing`
--
ALTER TABLE `ph_billing`
  ADD CONSTRAINT `ph_billing_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_list` (`p_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
