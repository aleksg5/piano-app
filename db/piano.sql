-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Kwi 2018, 12:54
-- Wersja serwera: 10.1.29-MariaDB
-- Wersja PHP: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `piano`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sheets`
--

CREATE TABLE `sheets` (
  `id` int(11) NOT NULL,
  `title` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sheet` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `sheets`
--

INSERT INTO `sheets` (`id`, `title`, `sheet`) VALUES
(1, 'Tetris', 'u rty tre etu ytr rty u t ee y yip oiu tyu ytr rty u t ee \r\nu t y r t e W u t y r t u p O\r\nu rty tre etu ytr rty u t ee y yip oiu tyu ytr rty u t ee'),
(2, 'Written in the stars', '[6u] u y y u [i4] t i u y t [t8] t u y y t [y5] u y [t6] u y y u [i4] t p o i [u1] t u u o o t a t a [p6] y y y t 4 y y y t 1 y y y t 5 y y y t'),
(82, 'WlazÅ‚ kotek na pÅ‚otek', 'o uu i yy tuo tuo o uu i yy tut tut\nt uu y ii ouo ouo t uu y ii ouo tut'),
(83, 'Dla Elizy', 'fDfDfads [p6]\n0etup [a7]\n0WuOa [s6]\n0eufDfDfads [p6]\n0etup [a7]\n0WuOsa [p6]\n0easd [f8]\nwtogf [d5]\nwrifd [s6]\n0euds [a3]\n0uufuffxDfDfDfDfDfDfads [p6]\n0etup [a7]\n0WuOa [s6]\n0eufDfDfads [p6]\n0etup [a7]\n0WuOsa [p6]');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `sheets`
--
ALTER TABLE `sheets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `sheets`
--
ALTER TABLE `sheets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
