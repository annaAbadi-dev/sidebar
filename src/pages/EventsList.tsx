import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AppBreadcrumb,
  type BreadcrumbSegmentDef,
} from '../components/BreadCrumbs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Home as HomeIcon } from 'lucide-react'

const data = Array.from({ length: 100 }, (_, i) => ({
  id: 2300 + i,
  name: 'Demo AC Competition',
  org: 'Athletics Canada Event and Officials',
  status: 'Under Construction',
  listing: 'Off',
  registrations: 179,
}))
const ITEMS_PER_PAGE = 10
export default function EventsList() {
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
  const totalResults = data.length

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = data.slice(startIndex, endIndex)
  const breadcrumbSegments: BreadcrumbSegmentDef[] = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Programs', path: '/programs' },
    { label: 'Events' },
  ]
  return (
    <div>
      <AppBreadcrumb segments={breadcrumbSegments} />
      <div className="flex w-full items-center justify-between border-b p-4">
        {/* Left Side: Search Bar */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Events..." className="pl-9" />
        </div>

        {/* Right Side: Pagination and Actions */}
        <div className="flex items-center gap-6">
          {/* Results and Pagination */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              {totalResults} Results
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Import Course Records
            </Button>
            <Button size="sm">Create New Event</Button>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registrations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((event) => (
            <TableRow
              key={event.id}
              className="cursor-pointer"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <TableCell>{event.id}</TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.org}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>{event.registrations}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
