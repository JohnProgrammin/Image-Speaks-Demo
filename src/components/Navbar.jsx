import React from 'react'
import logo from '../assets/logisti.svg'
import arrow from '../assets/arrow.svg'

function Navbar() {
  return (
        <nav class="bg-[#00ff9d] fixed w-full z-20 top-0 start-0 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src= {logo} class="h-8" alt="Logisti Logo" />
      <span class="self-center text-2xl font-regular whitespace-nowrap text-black">Logisti</span>
  </a>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" class="text-white font-[400] bg-black hover:bg-white hover:text-black focus:ring-4 focus:outline-none transition ease-in-out duration-400 cursor-pointer focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-3 text-center">Login</button>
      <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[###00ff9d] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
      <li>
        <a href="#" class="flex items-center py-2 px-3 font-[400] text-white " aria-current="page">Home <img className='ml-1 w-3 h-3 rotate-180' src={arrow} alt="" /></a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 font-[400] text-black rounded-sm hover:text-white hover:ring-2 ring-white ease-in-out transition duration-400">Services</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 font-[400] text-black rounded-sm hover:text-white hover:ring-2 ring-white ease-in-out transition duration-400">Projects</a>
      </li>
      <li>
        <a href="#" class="flex items-center py-2 px-3 font-[400] text-black rounded-sm hover:text-white hover:ring-2 ring-white ease-in-out transition duration-400">Page <img className='ml-1 w-3 h-3 rotate-180' src={arrow} alt="" /></a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 font-[400] text-black rounded-sm hover:text-white hover:ring-2 ring-white ease-in-out transition duration-400">Contact Us</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
  )
}

export default Navbar