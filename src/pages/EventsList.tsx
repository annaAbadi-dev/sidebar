import { useNavigate } from 'react-router-dom'
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
import { Home as HomeIcon } from 'lucide-react'

const data = Array.from({ length: 10 }, (_, i) => ({
  id: 2300 + i,
  name: 'Demo AC Competition',
  org: 'Athletics Canada Event and Officials',
  status: 'Under Construction',
  listing: 'Off',
  registrations: 179,
}))

export default function EventsList() {
  const navigate = useNavigate()
  const breadcrumbSegments: BreadcrumbSegmentDef[] = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Programs', path: '/programs' },
    { label: 'Events' }, // Last item is automatically treated as current, no path needed
  ]
  return (
    <div>
      <AppBreadcrumb segments={breadcrumbSegments} />
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
          {data.map((event) => (
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
