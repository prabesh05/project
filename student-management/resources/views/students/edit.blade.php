@extends('layouts.app')

@section('title', 'Edit Student')

@section('content')
<div class="card">
    <h2>Edit Student</h2>

    @if($errors->any())
        <div class="alert alert-error">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('students.update', $student) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $student->name) }}" required>
        </div>

        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" class="form-control" value="{{ old('email', $student->email) }}" required>
        </div>

        <div class="form-group">
            <label for="enrollment_number">Enrollment Number *</label>
            <input type="text" id="enrollment_number" name="enrollment_number" class="form-control" value="{{ old('enrollment_number', $student->enrollment_number) }}" required>
        </div>

        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" id="phone" name="phone" class="form-control" value="{{ old('phone', $student->phone) }}">
        </div>

        <div class="form-group">
            <label for="date_of_birth">Date of Birth</label>
            <input type="date" id="date_of_birth" name="date_of_birth" class="form-control" value="{{ old('date_of_birth', $student->date_of_birth?->format('Y-m-d')) }}">
        </div>

        <div class="form-group">
            <label for="address">Address</label>
            <textarea id="address" name="address" class="form-control" rows="3">{{ old('address', $student->address) }}</textarea>
        </div>

        <div class="actions">
            <button type="submit" class="btn btn-success">Update Student</button>
            <a href="{{ route('students.index') }}" class="btn btn-danger">Cancel</a>
        </div>
    </form>
</div>
@endsection
