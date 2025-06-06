import React from 'react'
import { Link as RouterLink } from 'react-router-dom' // Assuming react-router-dom

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb' // Path to your Shadcn UI breadcrumb component

import { ModeToggle } from './mode-toggle'
export interface BreadcrumbSegmentDef {
  label: string
  path?: string // Full path for navigation
  isCurrent?: boolean // Explicitly mark if it's the current page, useful if not the last
  icon?: React.ElementType
}

interface AppBreadcrumbProps {
  segments: BreadcrumbSegmentDef[]
  className?: string
}

export const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({
  segments,
  className,
}) => {
  if (!segments || segments.length === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <Breadcrumb className={className}>
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const isLastItemInArray = index === segments.length - 1
              // Determine if it's the current page: either explicitly marked or the last item.
              const isCurrentPage = segment.isCurrent || isLastItemInArray
              const IconComponent = segment.icon

              return (
                <React.Fragment key={segment.label + index}>
                  <BreadcrumbItem>
                    {isCurrentPage ? (
                      <BreadcrumbPage className="flex items-center font-medium">
                        {' '}
                        {/* Shadcn's BreadcrumbPage handles current styling */}
                        {IconComponent && (
                          <IconComponent className="mr-1.5 h-4 w-4 flex-shrink-0" />
                        )}
                        {segment.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <RouterLink
                          to={segment.path || '#'}
                          className="flex items-center"
                        >
                          {' '}
                          {/* Default to '#' if no path */}
                          {IconComponent && (
                            <IconComponent className="mr-1.5 h-4 w-4 flex-shrink-0" />
                          )}
                          {segment.label}
                        </RouterLink>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLastItemInArray && <BreadcrumbSeparator />}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  )
}
