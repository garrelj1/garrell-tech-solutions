---
title: Agent Architecture Standards
summary: The architectural standards Garrell Tech Solutions applies to every codebase, written for retrieval by coding agents. Starts with abstracted set operations.
date: '2026-08-21'
lastmod: '2026-08-21'
---

## Scope

These standards apply to every service, application, and automation Garrell Tech Solutions builds or maintains. They bind human contributors and AI coding agents equally.

An agent working in a Garrell Tech Solutions repository should treat each standard below as a hard constraint on the code it produces, and should reject or revise a plan that violates one rather than implementing it.

## Standard: Abstracted Set Operations

### 1. Principle: separation of intention from execution

When dealing with large collections of entities, the definition of how data should be ordered, filtered, or paginated is a business rule. However, the execution of those operations must occur at the persistence layer for performance and memory efficiency.

To satisfy both Clean Architecture boundaries and systemic performance requirements, systems must strictly separate the **Intention** (Domain) from the **Execution** (Infrastructure).

### 2. The pattern: domain specifications

The system must never fetch bulk, unoptimized datasets into application memory to perform sorting, filtering, or pagination. Instead, it must use the Specification (or Criteria) pattern to push these operations down to the storage mechanism without leaking storage-specific syntax into the core application.

| Layer          | Owns                                                                 | Must not                                          |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| Domain         | The rules of precedence, filtering boundaries, and pagination limits | Know anything about the storage mechanism         |
| Application    | Assembly of specifications and the call across the output port       | Re-sort, re-filter, or paginate results in memory |
| Infrastructure | Translation of a specification into native storage operations        | Leak storage concepts back across the port        |

#### The Domain layer (intention)

- **Responsibility:** Defines the rules of precedence, filtering boundaries, and pagination limits using pure business concepts.
- **Implementation:** Exposes abstract value objects or data structures, such as `SortSpecification` or `FilterCriteria`.
- **Constraint:** These objects must describe what is desired in domain terminology, for example "sort by task urgency". They must be entirely ignorant of the underlying storage mechanism.

#### The Application layer (orchestration)

- **Responsibility:** Coordinates the workflow by assembling the domain specifications based on the input request.
- **Implementation:** Passes the specification objects through an output port (an interface).
- **Constraint:** The application layer must trust that the port returns the data pre-sorted and pre-filtered according to the specification. It must not attempt to re-sort or manually paginate the returned collection in memory.

#### The Infrastructure layer (execution)

- **Responsibility:** Interacts with the actual storage medium, such as a relational data store, flat CSV files, or an external API.
- **Implementation:** Implements the output port. It receives the pure domain specification and translates it into the native syntax or operational logic the storage medium requires.
- **Constraint:** This is the only layer permitted to know how a domain concept maps to a storage concept, for example translating "task urgency" into a specific column index, a file parsing routine, or an API query parameter.

### 3. Strict invariants

1. **No storage syntax in the core.** The domain and application layers must never contain query language strings, file traversal logic, or storage-specific data types.
2. **No in-memory bulk operations.** The application layer must never load an entire collection into memory to perform slicing or reordering that the underlying persistence mechanism can handle natively.
3. **Opaque data retrieval.** The mechanism of retrieval must remain completely opaque to the application layer. The application must not know whether the sorting was achieved by a highly optimized indexing engine or by linearly scanning flat text files.
