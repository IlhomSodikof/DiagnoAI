import React from 'react'
import { Link } from 'react-router-dom'
import BackButton from './BackButton'

export default function BredCumb({ page }) {
  return (
    <nav className="flex justify-between mb-0 mx-6" aria-label="Breadcrumb">
      <BackButton />
      <ol className="inline-flex items-center space-x-1 md:space-x-2 ml-6">
        <li className="inline-flex items-center">
          <Link to="/" className="text-gray-700 hover:text-gray-900 inline-flex items-center">
            <svg
              className="w-5 h-5 mr-2.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Bosh sahifa
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
            >
              {page}
            </Link>
          </div>
        </li>

      </ol>
    </nav>
  )
}
