// Students API endpoint
// Fetches students data from D1 database

export async function onRequestGet({ request, env }) {
    try {
        // Query all students from D1 database
        const result = await env.DB.prepare(`
            SELECT
                name,
                img,
                reflections,
                url
            FROM students
        `).all();

        // Transform database rows to original JSON structure
        const studentsData = {};

        result.results.forEach(student => {
            studentsData[student.name] = {
                name: student.name,
                img: student.img,
                소감: student.reflections,
                url: student.url  // Include URL in the response
            };
        });

        return new Response(JSON.stringify(studentsData), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour since data changes infrequently
            }
        });

    } catch (error) {
        console.error('Students API error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to fetch students data',
            details: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// POST endpoint for creating/updating students
export async function onRequestPost({ request, env }) {
    try {
        const studentData = await request.json();

        // Validate required fields
        if (!studentData.name) {
            return new Response(JSON.stringify({
                error: 'Missing required field: name'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Check if student exists
        const existingStudent = await env.DB.prepare(`
            SELECT name FROM students WHERE name = ?
        `).bind(studentData.name).first();

        if (existingStudent) {
            // Update existing student
            const result = await env.DB.prepare(`
                UPDATE students
                SET img = ?, reflections = ?, url = ?, updated_at = ?
                WHERE name = ?
            `).bind(
                studentData.img || null,
                studentData.소감 || null,
                studentData.url || null,
                Math.floor(Date.now() / 1000),
                studentData.name
            ).run();

            if (result.success) {
                return new Response(JSON.stringify({
                    success: true,
                    operation: 'update',
                    name: studentData.name
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                throw new Error('Failed to update student');
            }
        } else {
            // Insert new student
            const result = await env.DB.prepare(`
                INSERT INTO students (
                    name, img, reflections, url
                ) VALUES (?, ?, ?, ?)
            `).bind(
                studentData.name,
                studentData.img || null,
                studentData.소감 || null,
                studentData.url || null
            ).run();

            if (result.success) {
                return new Response(JSON.stringify({
                    success: true,
                    operation: 'insert',
                    name: studentData.name
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                throw new Error('Failed to insert student');
            }
        }

    } catch (error) {
        console.error('Students POST error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to create/update student',
            details: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Bulk import endpoint for migrating from JSON
export async function onRequestPut({ request, env }) {
    try {
        const studentsData = await request.json();

        // Validate input
        if (!Array.isArray(studentsData) && typeof studentsData !== 'object') {
            return new Response(JSON.stringify({
                error: 'Invalid data format. Expected array or object of students.'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Convert object format to array if needed
        const studentArray = Array.isArray(studentsData)
            ? studentsData
            : Object.entries(studentsData).map(([name, data]) => ({
                name,
                ...data
            }));

        // Begin transaction for bulk insert/update
        const stmt = env.DB.prepare(`
            INSERT OR REPLACE INTO students (name, img, reflections, url)
            VALUES (?, ?, ?, ?)
        `);

        let successCount = 0;
        for (const student of studentArray) {
            try {
                await stmt.bind(
                    student.name,
                    student.img || null,
                    student.소감 || null,
                    student.url || null
                ).run();
                successCount++;
            } catch (error) {
                console.error(`Failed to insert/update student ${student.name}:`, error);
            }
        }

        return new Response(JSON.stringify({
            success: true,
            operation: 'bulk_import',
            imported_count: successCount,
            total_count: studentArray.length
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Students bulk import error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to import students',
            details: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}